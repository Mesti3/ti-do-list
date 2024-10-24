import { handleItemToggleLogic, handleDeleteItemLogic } from './todoItem';

describe('TodoItemComp Logic', () => {
  const mockToggleHandler = jest.fn();
  const mockDeleteHandler = jest.fn();

  test('calls toggleHandler with correct arguments', () => {
    const itemId = '1';
    const completed = false;

    handleItemToggleLogic(itemId, completed, mockToggleHandler);

    expect(mockToggleHandler).toHaveBeenCalledWith(itemId, completed);
  });

  test('calls deleteHandler with correct arguments', () => {
    const itemId = '1';

    handleDeleteItemLogic(itemId, mockDeleteHandler);

    expect(mockDeleteHandler).toHaveBeenCalledWith(itemId);
  });
});