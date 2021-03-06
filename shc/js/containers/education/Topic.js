import $ from 'jquery';
import React, { Component } from 'react';
import { render } from 'react-dom';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';
import Legend from '../../components/education/Legend';
import ItemCount from '../../components/education/ItemCount';
import ReadOnly from '../../components/education/ReadOnly';

class Topic extends Component {
    constructor(props) {
        super(props);
        this.topicContent = this.topicContent.bind(this);
        this.content = this.content.bind(this);
        this.data = {
            encounter: false,
            title: false
        };
    }

    topicContent(props){
        const { topic } = props;

        return (
            <td className="title">
                <NavLink to={ '/education/point/key=' + topic.key }>{ topic.displayText.toLowerCase() }<ItemCount num={ topic.point.length } /></NavLink><ReadOnly readOnly={ topic.readOnly } />
            </td>
        );
    }

    back() {
        return (
            <div className="custom-button-container">
                <NavLink to="/education"><button className="button custom-button custom-cancel-button">Back To Title</button></NavLink>
            </div>
        );
    }

    content() {
        if(this.data.encounter && this.data.title){
            return (
                <div>
                    <Legend />
                    <div className="patient-education shc-table">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th>Status</th>
                                    <th>Due Date</th>
                                    <th>Topic</th>
                                    <th>Ordered By</th>
                                </tr>
                            </thead>
                            <tbody>
                        { this.data.title.topic.map(topic =>
                            <tr key={ topic.key }>
                                <td className="status">
                                    <div className={"image " + topic.status }></div>
                                </td>
                                <td className="date"><Moment format="MM/DD/YYYY">{ new Date(this.data.encounter.date) }</Moment></td>
                                <this.topicContent topic={ topic } />
                                <td className="provider-name">{ this.data.title.provider.name }</td>
                            </tr>
                        )}
                            </tbody>
                        </table>
                    </div>
                    <this.back />
                </div>
            );
        }else{
            return (
                <div>
                    <div className="info">You have no educational content available at this time.</div>
                    <this.back />
                </div>
            );
        }
    }

    render() {
        const encounters = (this.props.education && this.props.education.response && this.props.education.response.encounter ? this.props.education.response.encounter : []);
        const { keyValue } = this.props;

        encounters.map(encounter => {
            encounter.title.map(title => {
                if(title.key && keyValue.indexOf(title.key) === 0){
                    this.data.encounter = encounter;
                    this.data.title = title;
                }
            });
        });

        return (
            <div className="summary">
                <div className="title">
                    <h1>{ this.data.title.displayText }</h1>
                </div>
                <this.content />
            </div>
        );
    }
}

export default Topic;
