import { Button } from 'components/controls/Button'
import { Checkbox } from 'components/controls/Checkbox'
import { Input, InputState } from 'components/controls/Input'
import { createTodo, Todo } from 'models/Todo'
import { ChangeEvent, KeyboardEvent } from 'react'
import './TodoCreator.css'
import { useState } from 'react'

interface Props {
  todos: Todo[]
  addTodo: (todo: Todo) => void
  input: string
  setInput: (text: string) => void
  showAll: boolean
  setShowAll: (state: boolean) => void
  setSortAscending: (state: boolean) => void
}

export const TodoCreator = ({
  todos,
  addTodo,
  input,
  setInput,
  showAll,
  setShowAll,
  setSortAscending,
}: // updateEditText,
Props) => {
  const createAndAddTodo = () => {
    if (inputState === 'valid') {
      console.log('add')
      addTodo(createTodo(input))
      setInput('')
      return
    }
    setInput('')
  }

  const handleKeyboardEvent = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      createAndAddTodo()
    }
  }

  const checkInputState = (): InputState => {
    if (!input) {
      return 'empty'
    }
    if (todos.map(t => t.text.toLowerCase()).includes(input.toLowerCase())) {
      return 'invalid'
    }
    return 'valid'
  }

  let inputState = checkInputState()

  const viewTemplate = (
    <div className="todo-creator" onKeyDown={handleKeyboardEvent}>
      <div className="todo-creator-input">
        <Input
          inputState={inputState}
          input={input}
          setInput={setInput}
        ></Input>
      </div>
      <div className="todo-creator-add">
        <Button onClick={createAndAddTodo} buttonType="add">
          Add
        </Button>
      </div>
      <div className="todo-creator-options">
        <Checkbox
          checkboxType="option"
          onChange={() => {
            setShowAll(!showAll)
          }}
          checked={showAll}
        >
          Show all
        </Checkbox>
      </div>
      <div className="todo-creator-up">
        <Button onClick={() => setSortAscending(false)} buttonType="up">
          &#8593;
        </Button>
      </div>
      <div className="todo-creator-down">
        <Button onClick={() => setSortAscending(true)} buttonType="down">
          &#8595;
        </Button>
      </div>
    </div>
  )
  return viewTemplate
}
