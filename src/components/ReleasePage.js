import React, { useState } from "react";
import { Table, Input, Form, FormGroup, Col, Row, Button } from "reactstrap";
import uuid from "uuid/v4";
import ReleaseIndex from "./ReleaseIndex";

const ReleasePage = () => {
  const [release, setRelease] = useState(
    JSON.parse(localStorage.getItem("releases")) || []
  );

  const onFocus = (e) => {
    e.currentTarget.type = "date";
  };

  const onBlur = (e) => {
    e.currentTarget.type = "text";
    const name = e.currentTarget.name;
    e.currentTarget.placeholder =
      name === "releaseDate" ? "Release Date" : "Start Date";
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const task = e.target.task.value;
    const progress = e.target.progress.value;
    const status = e.target.status.value;
    const description = e.target.description.value;
    const startDate = e.target.startDate.value;
    const endDate = e.target.endDate.value;
    const tasks = { task, progress, status, description, startDate, endDate };
    const index = e.target.getAttribute("index");
    const rel = [...release];
    const prog = rel[index].progress;
    prog.push(tasks);
    const avg =
      prog.reduce((acc, curr) => acc + parseInt(curr.progress), 0) /
      prog.length;
    rel[index].progressValue = Math.floor(avg);
    const progVal = rel[index].progressValue;
    rel[index].status =
      progVal === 0 ? "In Progress" : progVal < 100 ? "Unreleased" : "Released";
    setRelease(rel);
    localStorage.setItem("releases", JSON.stringify(rel));
  };

  const editFormValue = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const id = e.target.id;
    const val = e.target.value;
    const rel = [...release];
    const ele = rel.find((r) => r.id === id);
    const index = rel.indexOf(ele);
    rel[index][name] = val;
    setRelease(rel);
  };

  const deleteRelease = (id) => {
    const rel = [...release];
    const updated = rel.filter((r) => r.id !== id);
    setRelease(updated);
    localStorage.setItem("releases", JSON.stringify(updated));
  };

  const handleClick = (event) => {
    event.preventDefault();
    let releases = JSON.parse(localStorage.getItem("releases")) || [];
    let release = {};
    release.id = uuid();
    release.versionName = event.target.versionName.value;
    release.startDate = event.target.startDate.value;
    release.releaseDate = event.target.releaseDate.value;
    release.description = event.target.description.value;
    release.progress = [];
    release.progressValue = 0;
    release.status = release.releaseDate ? "Released" : "In Progress";
    releases.push(release);
    setRelease(releases);
    localStorage.setItem("releases", JSON.stringify(releases));
  };
  return (
    <>
      <Table dark>
        <thead>
          <tr>
            <th key="drag">#</th>
            <th>Version</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Start date</th>
            <th>Release Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {release && release.length
            ? release.map((rel, index) => {
                return (
                  <ReleaseIndex
                    release={rel}
                    index={index}
                    editFormValue={editFormValue}
                    deleteRelease={deleteRelease}
                    handleTaskSubmit={handleTaskSubmit}
                  />
                );
              })
            : null}
        </tbody>
      </Table>
      <div
        style={{
          bottom: "0px",
          position: "absolute",
          width: "100%",
          zIndex: "999",
          height: "90px",
          background: "black",
          overflowX: "hidden",
        }}
      >
        <Form
          onSubmit={handleClick}
          style={{
            position: "relative",
            top: "30%",
            left: "20px",
          }}
        >
          <Row form>
            <Col sm={1} md={2}>
              <FormGroup>
                <Input
                  type="text"
                  placeholder="Version Name"
                  name="versionName"
                  required
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Input
                  type="text"
                  placeholder="Start Date"
                  name="startDate"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Input
                  type="text"
                  placeholder="Release Date"
                  name="releaseDate"
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </FormGroup>
            </Col>
            <Col md={2} lg={3}>
              <FormGroup>
                <Input
                  type="text"
                  placeholder="Description"
                  name="description"
                  required
                />
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Button color="primary" type="submit" id="submitRelease">
                  Add
                </Button>{" "}
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};
export default ReleasePage;
