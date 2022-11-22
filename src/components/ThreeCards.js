import React from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { PieChart } from 'react-minimal-pie-chart';

const ThreeCards = ({tasks}) => {
    return(
        <div className="row mx-auto">
            <div className="col-md-4">
              <Card className="mt-3 shadow">
                <Card.Body>
                  <Card.Title>Task Completed</Card.Title>
                  <Card.Title className="shadow_btn">
                    {tasks.filter((x) => x.completed == true).length}
                  </Card.Title>
                  <Card.Text>/{tasks.length}</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
              <Card
                className="mt-3 shadow"
                style={{ height: 125, overflow: "scroll" }}
              >
                <Card.Body>
                  <Card.Title>Latest Created Tasks</Card.Title>
                  {tasks.map((task, i) => (
                    <Card.Text
                      key={i}
                      style={{
                        textDecorationLine: task.completed
                          ? "line-through"
                          : "",
                      }}
                    >
                      {task.name}
                    </Card.Text>
                  ))}
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
              <Card className="mt-3 shadow">
                <Card.Body>
                  <PieChart
                    style={{ height: 95 }}
                    data={[
                      {
                        title: "Completed",
                        value: tasks.filter((x) => x.completed == true).length,
                        color: "#5285ec",
                      },
                      {
                        title: "In-Complete",
                        value: tasks.filter((x) => x.completed == false).length,
                        color: "#e8ecec",
                      },
                    ]}
                  />
                </Card.Body>
              </Card>
            </div>
          </div>
    )
}

export default ThreeCards