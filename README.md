# my-first-next-todolist

## Description

This is my first project using Next.js. It is a Todo List app with basic features like CRUD tasks. I hope this can be helpful for other beginners learning Next.js.

## Planned Features

- [V] Todo Items List
- [ ] Todo Item Create
- [ ] Todo Item Edit
- [ ] Todo Item Delete
- [V] Todo Item Add Star
- [V] Todo Item Done

## Additional Notes

- Database: Using PostgreSQL.
- API: Built with Next.js.
- Single Page: No router used.
- Login: Not included.

## Database Schema

### todo_item

| name        | type         | desc                       |
| ----------- | ------------ | -------------------------- |
| id          | serial       | auto increment             |
| title       | varchar(50)  | todo item title            |
| content     | varchar(500) | todo item content (detail) |
| is_star     | boolean      | is marked with a star      |
| status      | varchar(10)  | TODO / DONE                |
| create_time | timestamptz  | create timestamp           |
| update_time | timestamptz  | update timestamp           |
| seq         | integer      | sequence                   |
