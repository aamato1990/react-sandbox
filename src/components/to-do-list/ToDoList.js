import React from "react";

export class ToDoList extends React.Component {

    constructor() {
        super();
        this.state = {
            toDoInput: "",
            toDo: []
        };
    }

    onSubmit(e) {
        e.preventDefault();
        let newToDo = this.state.toDo;
        console.log(newToDo);
        newToDo.push({
                title: this.state.toDoInput,
                completed: false
        });
        this.setState({
                toDoInput: "",
                toDo: newToDo
        });
    }

    handleChange(e) {
        this.setState({
                toDoInput: e.target.value,
                toDo: this.state.toDo
        });
    }

    handleToDoCheck(e) {
        e.target.checked = !e.target.checked;
        this.state.toDo.map((task, index) => {
            if (task.title == e.target.value) {
                this.state.toDo[index].completed = e.target.checked;
            }
        })
    }
    
    render () {
        const {toDoInput, toDo} = this.state;
        return (
            <div>
                <h2>Make a List!</h2>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" value={toDoInput} onChange={this.handleChange.bind(this)}/>
                </form>
                {toDo.length > 0 ? (
                    toDo.map((task) => {
                        return (
                            <div>
                                <div>{task.title}</div>
                                <input type="checkbox" value={task.title} checked={task.completed} onClick={this.handleToDoCheck.bind(this)}/>
                            </div>
                        );
                    })
                ) : ""}
            </div>
    );
    }


}

