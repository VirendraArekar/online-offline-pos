export const tableDummyData = {
    columns : [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,

        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => row.year,
            sortable: true,
        },
    ],
    data : [
        {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
    ]
}