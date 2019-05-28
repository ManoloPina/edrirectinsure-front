import React from 'react';
import Auxiliary from '../../../Hoc/Auxiliary/Auxiliary';
import classes from './Project.module.scss';
import Input from '../../../Components/Input/Input';
import Button from '../../../Components/Button/Button';
import Title from '../../../Components/Title/Title';
import * as Constants from '../../../Constants';

const Project = (props) => {

  return (
    <Auxiliary>
      <i className={`far fa-trash-alt ${classes.CloseIcon}`} 
        onClick={() => props.removeProject(props.projectId)}></i>
      <div className={classes.Row}>
        <h2>{props.name}</h2>
        <div className={classes.ToDo}>
          <div className={classes.Row}>
            <Title type={Constants.TITLE_TYPES.SUB}>To Do</Title>
            {props.tasks.filter(item => item.finish_date.length === 0).length > 0 ? props.tasks.filter(item => item.finish_date.length === 0)
              .map((item, index) => {
              return (
                <div className={classes.Checkbox}>
                  <input type="checkbox"
                    name="finish_date"
                    onChange={(e) => {props.toggleTask(e, props.projectId, item.id, !(item.finish_date && item.finish_date.length > 0))}}
                    checked={false}/>
                  <label for="scales">{item.description}</label>
                  <i class={`far fa-times-circle ${classes.RemoveTaskIcon}`}
                  onClick={() => props.removeTask(props.projectId, item.id)}></i>
                </div>
              );
            }) : <p>You don't have tasks to complete</p>}
          </div>
          <div className={classes.Row}>
            <Title type={Constants.TITLE_TYPES.SUB}>Done</Title>
            {props.tasks.filter(item => item.finish_date.length > 0)
            .map((item, index) => {
              return (
                <div className={classes.Checkbox}>
                  <input type="checkbox"
                    disabled
                    name="finish_date"
                    checked={true}/>
                  <label hidden={item.finish_date.length < 0} for="scales">{item.description}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.AddTask}>
          <form>
            <div className={classes.Col}>
              <Input onChange={props.onChange} name="task" placeholder="Task" />
            </div>
            <div className={classes.Col}>
              <Button onClick={props.addTask.bind(this, props.projectId)}>Add</Button>
            </div>
          </form>
        </div>
      </div>
    </Auxiliary>
  );
}

export default Project;