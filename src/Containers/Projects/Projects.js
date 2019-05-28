import React, { Component } from 'react'
import classes from './Projects.module.scss';
import Content from '../../Components/Content/Content';
import Title from '../../Components/Title/Title';
import * as Constants from '../../Constants';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';
import Project from './Project/Project';

class Projects extends Component {

  state = {
    name: "",
    task: "",
    projects: [],
    finish_date: ""
  }

  constructor(props) {
    super(props);
    const { token } = this.props.auth;
    axios.defaults.headers.common = { 'Authorization': `bearer ${token}` }
  }

  componentDidMount = () => {

    const { id } = this.props.auth;

    this.getProjects(id);

  }

  render() {
    const { projects } = this.state;
    return (
      <div className={classes.Projects}>
        <div className={classes.ProjectsItems}>
          {
            projects && projects.length > 0
              ? this.state.projects.map((project, index) => {
                return (
                  <div key={index} className={classes.Col}>
                    <Content>
                      <Project
                        projectId={project.id}
                        name={project.name}
                        tasks={project.tasks}
                        onChange={this.handleChange}
                        addTask={this.addTask}
                        toggleTask={this.toggleTask}
                        removeProject={this.removeProject}
                        removeTask={this.removeTask} />
                    </Content>
                  </div>
                )
              })
              : null
          }
        </div>

        {/* CREATE PROJECTS */}
        <div className={classes.CreateProject}>
          <Content>
            <div className={classes.Row}>
              <Title type={Constants.TITLE_TYPES.SUB}>Create a new project</Title>
            </div>

            <form>
              <Input name="name"
                placeholder="Project name"
                onChange={this.handleChange} />
              <Button onClick={this.createProject}>Create Project</Button>
            </form>
          </Content>
        </div>
      </div>
    );
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  getProjects = userId => {

    axios({
      url: `${Constants.API}/projects`, method: 'post', data: {
        query: `
        {
          userProjects(
            userId: "${userId}"
         ) {
           id, name, tasks {
            id, 
            description, 
            creation_date, 
            finish_date
           }
         }
        }
      `
      }
    }).then(res => {
      const { userProjects } = res.data.data;
      console.log('Projects:', userProjects);
      this.setState({ projects: userProjects });
    })
      .catch(err => console.error('Error on fetch data from projects:', err));
  }

  createProject = (event) => {

    event.preventDefault();

    const { id } = this.props.auth;
    const { name } = this.state;

    if (name.length > 0) {
      axios({
        url: `${Constants.API}/projects`, method: 'post', data: {
          query: `
          mutation {
            addProject(
              name: "${name}",
              userId: "${id}",
              creation_date: "${moment().format()}"
            ) {
              id, name
            }
          }
        `
        }
      })
        .then(res => {
          const { userProjects } = res.data.data;
          if (userProjects && userProjects.length > 0)
            this.setState({ projects: userProjects });
          this.getProjects(this.props.auth.id);
        })
        .catch(err => console.error('Error on fetch data from projects:', err));
    } else {
      console.error('A name must be given to store a new Project');
    }

  }

  addTask = (projectId, event) => {

    event.preventDefault();

    const { id } = this.props.auth;
    const { task } = this.state;

    if (task.length > 0) {
      axios({
        url: `${Constants.API}/projects`, method: 'post', data: {
          query: `
          mutation {
            addTask(
              userId: "${id}",
              projectId: "${projectId}", 
              description: "${task}",
              creation_date: "${moment().format()}"
            )
          }
        `
        }
      })
        .then(res => this.getProjects(id))
        .catch(err => console.error('Error on fetch data from projects:', err));
    } else {
      console.error('The task must have a name');
    }

  }

  toggleTask = (event, projectId, taskId, isCompleted) => {

    const { id } = this.props.auth;

    axios({
      url: `${Constants.API}/projects`, method: 'post', data: {
        query: `
          mutation {
            completeTask(
              userId: "${id}",
              projectId: "${projectId}",
              finish_date: "${isCompleted ? moment().format() : ""}",
              id: "${taskId}"
            )
          }
        `
      }
    })
      .then(res => {
        this.getProjects(id)
      })
      .catch(err => console.error(`Error on update task ${taskId} :`, err));

  }

  removeProject = (projectId) => {
    const { id } = this.props.auth;

    axios({
      url: `${Constants.API}/projects`, method: 'post', data: {
        query: `
          mutation {
            deleteProject(
              userId: "${id}",
              projectId: "${projectId}"
            ) {
              id, name
            }
          }
        `
      }
    })
      .then(() => this.getProjects(id))
      .catch(err => console.error(`Error on delete project ${projectId} :`, err));
  }

  removeTask = (projectId, taskId) => {

    const { id } = this.props.auth;
    axios({
      url: `${Constants.API}/projects`, method: 'post', data: {
        query: `
          mutation {
            deleteTask(
              userId: "${id}",
              projectId: "${projectId}",
              taskId: "${taskId}"
            )
          }
        `
      }
    })
      .then(() => this.getProjects(id))
      .catch(err => console.error(`Error on delete task ${taskId} :`, err));
  }

}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, null)(Projects);