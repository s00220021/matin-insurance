import React from 'react';
import {Button, Card, CardBody, CardHeader, Row} from "reactstrap";

class ContentCard extends React.Component {
    render() {
        return (
            <Card className="shadow">
                <CardHeader className="border-0">
                    <Row className="align-items-center">
                        <div className="col">
                            <h3 className="mb-0">{this.props.title}</h3>
                        </div>
                        <div className="col text-right">
                            <Button
                                color="primary"
                                href="#pablo"
                                onClick={this.props.top_callback}
                                size="sm"
                            >
                                {this.props.top_button}
                            </Button>
                        </div>
                    </Row>
                </CardHeader>
                <CardBody>
                    {this.props.children}
                </CardBody>
            </Card>
        );
    }
}

export default ContentCard;