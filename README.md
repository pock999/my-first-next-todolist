# my-first-next-todolist

## Description

This is my first project using Next.js. It is a Todo List app with basic features like CRUD tasks. I hope this can be helpful for other beginners learning Next.js.

## Planned Features

- [x] Todo Items List (no filter)
- [x] Todo Item Create
- [ ] Todo Item Edit
- [ ] Todo Item Delete
- [ ] Todo Items Filter (Search)
- [ ] Todo Item Add Star
- [ ] Todo Item Done

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
