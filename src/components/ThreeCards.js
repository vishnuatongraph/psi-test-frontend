import React from "react";
import Card from "react-bootstrap/Card";
import { PieChart } from "react-minimal-pie-chart";
import { Col, Row } from "react-bootstrap";

const ThreeCards = ({ tasks }) => {
  return (
    <Row className="mx-auto">
      <Col md={4}>
        <Card className="mt-3 shadow">
          <Card.Body>
            <Card.Title>Task Completed</Card.Title>
            <h2 className="shadow_btn">
              {tasks.filter((x) => x.completed === true).length}
            </h2>
            <Card.Text>/ {tasks.length}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card
          className="mt-3 shadow"
          style={{ height: 133, overflow: "scroll" }}
        >
          <Card.Body>
            <Card.Title>Latest Created Tasks</Card.Title>
            {tasks.map((task, i) => (
              <Card.Text
                key={i}
                className={task.completed ? "linethrough" : ""}
              >
                {task.name}
              </Card.Text>
            ))}
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="mt-3 shadow">
          <Card.Body>
            <PieChart
              style={{ height: 95 }}
              data={[
                {
                  title: "Completed",
                  value: tasks.filter((x) => x.completed === true).length,
                  color: "#5285ec",
                },
                {
                  title: "In-Complete",
                  value: tasks.filter((x) => x.completed === false).length,
                  color: "#e8ecec",
                },
              ]}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ThreeCards;
