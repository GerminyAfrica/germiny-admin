import React, { Component } from "react";
import { withTheme } from "@material-ui/core";

export class UserCard extends Component {
  render() {
    const { theme } = this.props;
    const isDark = theme.palette.type === 'dark';
    
    return (
      <div 
        className="card card-user" 
        style={{
          background: isDark 
            ? 'rgba(45, 55, 72, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          border: isDark 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.1)',
          color: theme.palette.text.primary,
          boxShadow: isDark 
            ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
            : '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
        <div className="image">
          <img src={this.props.bgImage} alt="..." />
        </div>
        <div className="content" style={{padding:"3%"}}>
          <div className="author">
            <a href="#pablo">
              <img
                className="avatar border-gray"
                src={this.props.avatar}
                alt="..."
              />
              <h4 className="title" style={{ color: theme.palette.text.primary }}>
                {this.props.name}
                <br />
                <small style={{ color: theme.palette.text.secondary }}>{this.props.userName}</small>
              </h4>
            </a>
          </div>
          <p className="description text-center" style={{ color: theme.palette.text.secondary }}>
            {this.props.description}
          </p>
        </div>
        <hr style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }} />
        <div className="text-center">{this.props.socials}</div>
      </div>
    );
  }
}

export default withTheme(UserCard);
