

export const getFallbackRank = (fac) => {
    if (!fac) return 6;
    const desig = (fac.designation || '').toLowerCase().trim();

    // 1. Principal
    if (desig.includes('principal') || fac.isPrincipal) {
        return 1;
    }

    // 2. Head of Department (HOD)
    if (fac.isHOD || desig.includes('head of the department') || desig.includes('head of department') || /\bhod\b/.test(desig)) {
        return 2;
    }

    // 4. Associate Professor
    if (desig.includes('associate')) {
        return 4;
    }

    // 5. Assistant Professor
    if (desig.includes('assistant')) {
        return 5;
    }

    // 3. Professor (Full Professor)
    if (desig.includes('professor')) {
        return 3;
    }

    // 6. Other designations or unspecified
    return 6;
};

export const parseFacultyIndex = (val) => {
    if (val === null || val === undefined || val === '') return null;
    const num = Number(val);
    if (isNaN(num)) return null;
    return num;
};

/**
 * Sorts an array of faculty members based on their `index` position,
 * falling back to the hierarchy: principal, hod, professor, associate, assistant.
 * 
 * @param {Array} facultyList - List of faculty member objects.
 * @returns {Array} Sorted faculty members array.
 */
export const sortFaculty = (facultyList) => {
    if (!Array.isArray(facultyList) || facultyList.length === 0) {
        return [];
    }

    const unindexed = [];
    const indexed = [];

    facultyList.forEach((fac) => {
        const idx = parseFacultyIndex(fac?.index);
        if (idx !== null) {
            indexed.push({ ...fac, _parsedIndex: idx });
        } else {
            unindexed.push(fac);
        }
    });

    // Sort unindexed members by fallback hierarchy, then alphabetically by name
    unindexed.sort((a, b) => {
        const rankA = getFallbackRank(a);
        const rankB = getFallbackRank(b);
        if (rankA !== rankB) return rankA - rankB;
        return (a.name || '').localeCompare(b.name || '');
    });

    // If no faculty member has an explicit index, return the hierarchy-sorted list
    if (indexed.length === 0) {
        return unindexed;
    }

    // Sort indexed members primarily by their parsed index, breaking ties with hierarchy and name
    indexed.sort((a, b) => {
        if (a._parsedIndex !== b._parsedIndex) return a._parsedIndex - b._parsedIndex;
        const rankA = getFallbackRank(a);
        const rankB = getFallbackRank(b);
        if (rankA !== rankB) return rankA - rankB;
        return (a.name || '').localeCompare(b.name || '');
    });

    const totalLen = facultyList.length;
    const result = new Array(totalLen).fill(null);
    const overflowIndexed = [];

    // Place indexed members at 1-based target positions (idx - 1)
    indexed.forEach((item) => {
        let target = Math.round(item._parsedIndex) - 1;
        if (target < 0) target = 0;
        if (target < totalLen && result[target] === null) {
            result[target] = item;
        } else {
            overflowIndexed.push({ item, target });
        }
    });

    // Place overflow or colliding indexed members in the nearest available slot
    overflowIndexed.forEach(({ item, target }) => {
        let placed = false;
        // Search forward from target position
        for (let i = Math.min(target, totalLen - 1); i < totalLen; i++) {
            if (result[i] === null) {
                result[i] = item;
                placed = true;
                break;
            }
        }
        // If not placed, search backwards
        if (!placed) {
            for (let i = Math.min(target, totalLen - 1); i >= 0; i--) {
                if (result[i] === null) {
                    result[i] = item;
                    placed = true;
                    break;
                }
            }
        }
        // If all pre-allocated slots are filled, append
        if (!placed) {
            result.push(item);
        }
    });

    // Fill empty slots with unindexed members in their hierarchy-sorted order
    let uIdx = 0;
    for (let i = 0; i < result.length; i++) {
        if (result[i] === null) {
            if (uIdx < unindexed.length) {
                result[i] = unindexed[uIdx++];
            }
        }
    }

    // Append any remaining unindexed members
    while (uIdx < unindexed.length) {
        result.push(unindexed[uIdx++]);
    }

    return result.filter(Boolean);
};

export default sortFaculty;
