import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
  query {
    profile {
      avatar
      createdAt
      email
      fullName
      id
      type
      updatedAt
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      avatar
      createdAt
      email
      fullName
      id
      type
      updatedAt
    }
  }
`;

export const GET_TASKS = gql`
  query {
    tasks(input: {}) {
      assignee {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
      createdAt
      creator {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
      dueDate
      id
      name
      pointEstimate
      position
      status
      tags
    }
  }
`;

export const GET_POINT_ESTIMATE = gql`
  query {
    __type(name: "PointEstimate") {
      name
      enumValues {
        name
      }
    }
  }
`;

export const GET_TASK_TAG = gql`
  query {
    __type(name: "TaskTag") {
      name
      enumValues {
        name
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation ($input: CreateTaskInput!) {
    createTask(input: $input) {
      assignee {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
      createdAt
      creator {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
      dueDate
      id
      name
      pointEstimate
      position
      status
      tags
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation ($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      assignee {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
      createdAt
      creator {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
      dueDate
      id
      name
      pointEstimate
      position
      status
      tags
    }
  }
`;

export const DELETE_TASK = gql`
  mutation ($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      assignee {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
      createdAt
      creator {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
      dueDate
      id
      name
      pointEstimate
      position
      status
      tags
    }
  }
`;
