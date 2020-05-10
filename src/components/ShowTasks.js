import React from "react";
import { Progress } from "reactstrap";
import Draggable from "react-draggable"; // The default

const ShowTasks = ({ ele, index }) => {
  return (
    <Draggable>
      <tr>
        <td>t{index}</td>
        <td>{ele.task}</td>
        <td>{ele.status}</td>
        <td>
          <Progress color="success" value={ele.progress} />
        </td>
        <td>{ele.startDate}</td>
        <td>{ele.endDate}</td>
        <td>{ele.description}</td>
      </tr>
    </Draggable>
  );
};

export default ShowTasks;
