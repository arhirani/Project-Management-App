import React, { useState } from "react";
import {
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  Button,
  Badge,
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import ShowTasks from "./ShowTasks";

const ReleaseIndex = ({
  release,
  index,
  editFormValue,
  deleteRelease,
  handleTaskSubmit,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [taskModal, setTaskModal] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);
  const toggleSection = () => setCollapse(!collapse);
  const toggleModal = () => setModal(!modal);
  const toggleTaskModal = () => setTaskModal(!taskModal);

  return (
    <>
      <tr>
        <th>#{index}</th>
        <th
          onClick={toggleSection}
          style={{ color: "deepskyblue", cursor: "pointer" }}
        >
          {release.versionName}
        </th>
        <td>
          <Badge
            color={
              release.status === "Released"
                ? `success`
                : release.status === "Unreleased"
                ? "primary"
                : "warning"
            }
          >
            {release.status}
          </Badge>
        </td>
        <td>
          <Progress color="success" value={release.progressValue} />
        </td>
        <td>{release["startDate"]}</td>
        <td>{release["releaseDate"]}</td>
        <td>{release["description"]}</td>
        <td>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle nav>
              <i style={{ cursor: "pointer" }} className="icon-options"></i>{" "}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={toggleModal}>Edit</DropdownItem>
              <DropdownItem onClick={() => deleteRelease(release.id)}>
                Delete
              </DropdownItem>
              <DropdownItem onClick={toggleTaskModal}>Create Task</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </td>
      </tr>

      {/* Edit Modal */}
      <Modal isOpen={modal}>
        <ModalHeader toggle={toggleModal}>{release["versionName"]}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              Version Name:
              <Input
                type="text"
                defaultValue={release["versionName"]}
                name="versionName"
                id={release.id}
                onChange={editFormValue}
              />
            </FormGroup>
            <FormGroup>
              Status:
              <Input
                type="text"
                defaultValue={release["status"]}
                name="status"
                id={release.id}
                onChange={editFormValue}
              />
            </FormGroup>
            <FormGroup>
              Progress:
              <Input
                type="number"
                defaultValue={release["progressValue"]}
                name="progressValue"
                id={release.id}
                onChange={editFormValue}
              />
            </FormGroup>
            <FormGroup>
              Start Date:
              <Input
                type="date"
                defaultValue={release["startDate"]}
                name="startDate"
                id={release.id}
                onChange={editFormValue}
                max="12/12/2050"
                min="01/01/2001"
              />
            </FormGroup>
            <FormGroup>
              Release Date:
              <Input
                type="date"
                name="releaseDate"
                id={release.id}
                defaultValue={release["releaseDate"]}
                onChange={editFormValue}
                max="2050-12-12"
                min="2001-01-01"
              />
            </FormGroup>
            <FormGroup>
              Description :
              <Input
                type="text"
                placeholder="Description"
                name="description"
                id={release.id}
                defaultValue={release["description"]}
                onChange={editFormValue}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Save
          </Button>{" "}
        </ModalFooter>
      </Modal>

      {/* Create Task Modal */}
      <Modal isOpen={taskModal}>
        <ModalHeader toggle={toggleTaskModal}>
          {release["versionName"]}
        </ModalHeader>
        <ModalBody>
          <Form
            id="submit2"
            method="GET"
            listId={release.id}
            index={index}
            onSubmit={handleTaskSubmit}
          >
            <FormGroup>
              Create Task:
              <Input
                type="text"
                defaultValue=""
                placeholder="Task Name"
                name="task"
                index={index}
              />
            </FormGroup>
            <FormGroup>
              Status:
              <Input
                type="text"
                defaultValue=""
                placeholder="Status"
                name="status"
                index={index}
              />
            </FormGroup>
            <FormGroup>
              Completion Percentage:
              <Input
                type="number"
                name="progress"
                placeholder="Progress"
                defaultValue={release["progressValue"]}
                min="0"
                max="100"
              />
            </FormGroup>
            <FormGroup>
              Start Date
              <Input
                type="date"
                defaultValue=""
                placeholder="Start Date"
                name="startDate"
                index={index}
              />{" "}
            </FormGroup>
            <FormGroup>
              End Date:
              <Input
                type="date"
                defaultValue=""
                placeholder="endDate"
                name="endDate"
                index={index}
              />{" "}
            </FormGroup>
            <FormGroup>
              Description:
              <Input
                type="text"
                defaultValue=""
                placeholder="Description"
                name="description"
                index={index}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            form="submit2"
            color="primary"
            type="submit"
            onClick={toggleTaskModal}
          >
            Save
          </Button>{" "}
        </ModalFooter>
      </Modal>
      {collapse
        ? release.progress.map((ele, index) => (
            <ShowTasks ele={ele} index={index} />
          ))
        : ""}
    </>
  );
};

export default ReleaseIndex;
