import './App.css'
import {Component} from 'react'
import {v4} from 'uuid'
import {MdDelete} from 'react-icons/md'
import {FaEdit} from 'react-icons/fa'
import {FaSearch} from 'react-icons/fa'

//Create a dummy JSON file as a data repository.
const initialTasks = [
  {
    id: v4(),
    title: 'Task 1',
    description: 'Description 1',
    completed: false,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: v4(),
    title: 'Task 2',
    description: 'Description 2',
    completed: false,
    lastUpdated: new Date().toISOString(),
  },
]

class App extends Component {
  state = {
    data: [...initialTasks],
    inputTask: '',
    searchInput: '',
    updatingId: '',
    inputDescription: '',
  }
  // Add the input task.
  inputTask = event => {
    this.setState({inputTask: event.target.value})
  }

  // Add the inputdescription.
  inputDesrciption = event => {
    this.setState({inputDescription: event.target.value})
  }
  // Add the task.
  addTask = () => {
    const {inputTask, data, inputDescription} = this.state
    if (inputTask !== '') {
      const newdata = {
        id: v4(),
        title: inputTask,
        completed: false,
        description: inputDescription,
        lastUpdated: new Date().toISOString(),
      }
      this.setState({
        data: [...data, newdata],
        inputTask: '',
        inputDescription: '',
      })
    }
  }
  // Add the search input.
  searchInput = event => {
    this.setState({searchInput: event.target.value})
  }
  //Mark the task.
  onClickCheck = id => {
    const {data} = this.state
    const newData = data.map(each => {
      if (each.id === id) {
        return {
          id: each.id,
          title: each.title,
          completed: !each.completed,
          description: each.description,
          lastUpdated: each.lastUpdated,
        }
      } else {
        return {
          id: each.id,
          title: each.title,
          completed: each.completed,
          description: each.description,
          lastUpdated: each.lastUpdated,
        }
      }
    })
    this.setState({data: [...newData]})
  }
  // Delete the task.
  onClickDeleteIcon = id => {
    const {data} = this.state
    const newData = data.filter(each => {
      if (id !== each.id) {
        return {
          id: each.id,
          title: each.title,
          completed: each.completed,
          description: each.description,
          lastUpdated: each.lastUpdated,
        }
      }
    })
    this.setState({data: [...newData]})
  }
  // Insert the update data  using update icon.
  onClickEditIcon = id => {
    const {data} = this.state
    const taskObj = data.filter(each => {
      if (id === each.id) {
        return {
          id: each.id,
          title: each.title,
          completed: each.completed,
          description: each.description,
          lastUpdated: each.lastUpdated,
        }
      }
    })
    this.setState({
      updatingId: id,
      inputTask: taskObj[0].title,
      inputDescription: taskObj[0].description,
    })
  }
  //Update the data.
  editTask = () => {
    const {updatingId, inputTask, inputDescription} = this.state
    const {data} = this.state
    const newData = data.map(each => {
      if (updatingId === each.id) {
        return {
          id: each.id,
          title: inputTask,
          completed: each.completed,
          description: inputDescription,
          lastUpdated: new Date().toISOString(),
        }
      } else {
        return {
          id: each.id,
          title: each.title,
          completed: each.completed,
          lastUpdated: each.lastUpdated,
          description: each.description,
        }
      }
    })
    this.setState({
      data: [...newData],
      inputTask: '',
      updatingId: '',
      inputDescription: '',
    })
  }
  render() {
    // Get the data from state.
    const {data, inputTask, searchInput, updatingId, inputDescription} =
      this.state
    // Filter the data according to searchInput.
    const filterData = data.filter(each => {
      if (each.title.toLowerCase().includes(searchInput.toLowerCase())) {
        return {
          id: each.id,
          title: each.title,
          completed: each.completed,
          description: each.description,
          lastUpdated: each.lastUpdated,
        }
      }
    })
    // Check whether the data is in updatingPhase or not.
    const editPhase = updatingId === '' ? false : true
    // Check filterData length.
    const check = filterData.length === 0 ? true : false
    return (
      <div className="bgContainer">
        <h1 className="heading">Todo List</h1>
        <div id="updateSection">
          <h2 className="createTaskHeading">Create Task</h2>
          <div className="inputTaskContainer">
            <input
              value={inputTask}
              onChange={this.inputTask}
              className="inputText"
              type="text"
              placeholder="Enter the title..."
            />
            <input
              className="inputText"
              type="text"
              placeholder="Enter the description..."
              value={inputDescription}
              onChange={this.inputDesrciption}
            />
          </div>
          {!editPhase && (
            <button onClick={this.addTask} className="addButton">
              Add
            </button>
          )}
          {editPhase && (
            <button onClick={this.editTask} className="addButton">
              Update
            </button>
          )}
        </div>
        <div className="myTaskContainer">
          <h2 className="myTaskHeading">My Tasks</h2>
          <div className="searchInputContainer">
            <input
              onChange={this.searchInput}
              className="searchInput"
              type="search"
              placeholder="Search here...."
              value={searchInput}
            />
            <div className="searchIconContainer">
              <FaSearch />
            </div>
          </div>
        </div>
        <ul className="listContainer">
          {filterData.map(each => {
            const {id, title, completed, lastUpdated, description} = each
            const OnChangeCheckbox = () => {
              this.onClickCheck(id)
            }
            const onDelete = () => {
              this.onClickDeleteIcon(id)
            }
            const onClickEdit = () => {
              this.onClickEditIcon(id)
            }
            return (
              <li className="listItem" key={id}>
                {!completed && (
                  <input
                    className="checkbox"
                    onChange={OnChangeCheckbox}
                    type="checkbox"
                  />
                )}
                {completed && (
                  <input
                    className="checkbox"
                    onChange={OnChangeCheckbox}
                    type="checkbox"
                    checked
                  />
                )}
                <div className="taskContainer">
                  <div>
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <p>
                      <span>Last Updated: </span>
                      {lastUpdated}
                    </p>
                  </div>
                  <div>
                    <a href="#updateSection">
                      <FaEdit onClick={onClickEdit} className="editIcon" />
                    </a>
                    <MdDelete onClick={onDelete} className="deleteIcon" />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        {check && (
          <div className="notFoundContainer">
            <h1 className="notFound">Not Found</h1>
          </div>
        )}
      </div>
    )
  }
}

export default App
