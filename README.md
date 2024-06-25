# Запросы к MongoDB 2.6 (Домашнее задание)
> Структура коллекции books
```
{
    title: "string",
    description: "string",
    authors: "string"
}
```

1. запрос(ы) для вставки данных минимум о двух книгах в коллекцию books

```
    db.books.insertOne(
    {
        title: "1",
        description: "1",
        authors: "1"
    })

    db.books.insertOne(
    {
        title: "2",
        description: "2",
        authors: "2"
    })

    db.books.insertMany([
    {
        title: "1",
        description: "1",
        authors: "1"
    },
    {
        title: "2",
        description: "2",
        authors: "2"
    },
    {
        title: "3",
        description: "3",
        authors: "3"
    }
])
```

2. запрос для поиска полей документов коллекции books по полю title,

```
db.books.find( { title: "Война и мир" } )
```

3. запрос для редактирования полей: description и authors коллекции books по \_id записи.
```
db.books.updateOne(
   { _id: ObjectId("mongoid_идентификатор") },
   { $set: { description: "новое описание", authors: "новый автор" } }
)

db.books.updateMany(
    { _id: { $in: [ObjectId("mongoid_идентификатор1"), ObjectId("mongoid_идентификатор2"), ...] } },
    {$set: { description: "новое описание", authors: "новый автор" } }
)
```