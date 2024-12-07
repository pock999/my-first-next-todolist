import { TodoListDto } from "@/dtos/res/todo-list.dto";
import { TodoItemEntity } from "@/entitys/todo-item.entity";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { ReactSortable } from "react-sortablejs";

export default function Home(props: { data: Array<TodoItemEntity> }) {

  const [q, setQ] = React.useState<string>('');
  const [todoList, setTodoList] = React.useState<Array<TodoItemEntity>>([]);

  React.useEffect(() => {
    setTodoList(props.data);
  }, []);

  return (
    <div
      className={`grid grid-rows-[100px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <div className={`flex-col flex grow w-full`}>
        <label
          htmlFor={"key_word"}
          className={"flex grow items-center mb-2 text-sm font-medium text-gray-900 dark:text-white"}>
            Keyword (Title/Content)
        </label>
        <input
          type="text"
          id="key_word"
          className={"flex grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "}
          placeholder="Keyword"
          required
          value={q}
          onChange={evt => setQ(evt.target.value)}
        />
      </div>
      <ReactSortable list={todoList} setList={(e) => {
        setTodoList(e);
        console.log('e => ', e);
      }}>
        {
          todoList.map((item: TodoItemEntity) => (
            <div key={item.id}> [id: {item.id}, seq: {item.seq}]client - { item.title }</div>
          ))
        }
      </ReactSortable>
    </div>
  );
}


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  console.log('server side');
  const apiPath = `${process.env.NEXT_PUBLIC_API_URL}/todo-item/list`
  const res: TodoListDto = await fetch(apiPath).then(res => res.json());

  return {
    props: {
      data: res.result ?? []
    }
  };
}