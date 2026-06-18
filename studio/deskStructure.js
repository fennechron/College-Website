export const myStructure = (S) =>
  S.list()
    .title('Content')
    .items([
      // Custom Grouping: Teachers by Department
      S.listItem()
        .title('Teachers')
        .id('teacher-group')
        .child(
          S.documentTypeList('department')
            .title('Teachers by Department')
            .child((departmentId) =>
              S.documentList()
                .title('Teachers')
                .filter('_type == "teacher" && department._ref == $departmentId')
                .params({ departmentId })
            )
        ),
      // Keep all other document types in the root, but hide the default flat 'teacher' list
      ...S.documentTypeListItems().filter(
        (listItem) => !['teacher'].includes(listItem.getId())
      ),
    ])
