import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UserTaskIndex.css';
import * as taskActions from '../../../store/task';
import { selectUser } from '../../../store/session';
import * as userActions from '../../../store/user';
import TaskCreateModal from '../TaskCreateForm/index'
import TableRow from '../../TableRow/TableRow';
import { formatDate } from '../../../store/util';

function UserTaskIndex() {
  const dispatch = useDispatch();
  const allTasks = useSelector(taskActions.getTasks);
  const currentUser = useSelector(selectUser);

  useEffect(() => {

    if (currentUser) dispatch(userActions.fetchUser(currentUser._id));
  }, [currentUser._id, dispatch]);

  const userTasks = allTasks.filter(
    (task) => task.assignee === currentUser._id
  );

  return (
    <div className="user-project-index">
      <div className='task-table'>
      <TableRow row={["Title", "Status","End Date"]} rowClass={"task-table-header"}
      />
      {userTasks.map((t, ix) => {
        const formattedDate = formatDate(t.endDate);
        return (
          <TableRow key={ix} row={[t.title, t.status, formattedDate]}
          rowClass={"default-row-class no-hover-ut"}
          />
        )
      })}
      </div>
    </div>
  );
}

export default UserTaskIndex;
