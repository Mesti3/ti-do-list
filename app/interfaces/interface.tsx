export interface TodoList {
  id: string;
  title: string;
}

export interface TodoItem {
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
  id: string;
}
