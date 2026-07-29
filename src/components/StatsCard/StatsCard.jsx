import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Paper, Box, Typography, IconButton, Tooltip, withTheme } from "@material-ui/core";

export class StatsCard extends Component {
  render() {
    const { theme } = this.props;
    const isDark = theme.palette.type === 'dark';
    
    return (
      <Paper 
        elevation={3}
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, rgba(45, 55, 72, 0.9) 0%, rgba(45, 55, 72, 0.8) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '25px',
          margin: '10px 0',
          border: isDark 
            ? '1px solid rgba(255,255,255,0.1)' 
            : '1px solid rgba(255,255,255,0.2)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          color: theme.palette.text.primary,
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: isDark 
              ? '0 12px 40px rgba(0,0,0,0.3)'
              : '0 12px 40px rgba(0,0,0,0.15)'
          }
        }}
        className="modern-stats-card"
      >
        <style jsx>{`
          .modern-stats-card:hover {
            transform: translateY(-5px) !important;
            box-shadow: 0 12px 40px rgba(0,0,0,0.15) !important;
          }
          
          .icon-container {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 15px;
            padding: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }
          
          .stats-number {
            font-weight: bold;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .pulse-animation {
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}</style>
        
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box flex={1}>
            <Typography 
              variant="h6" 
              style={{ 
                color: '#666', 
                fontWeight: 500, 
                marginBottom: '10px',
                fontSize: '0.9rem'
              }}
            >
              {this.props.statsText}
            </Typography>
            <Typography 
              variant="h3" 
              className="stats-number"
              style={{ 
                marginBottom: '15px',
                fontSize: '2.2rem'
              }}
            >
              {this.props.statsValue?.toLocaleString() || '0'}
            </Typography>
            <Box display="flex" alignItems="center">
              <Box display="flex" alignItems="center" style={{ color: '#4CAF50' }}>
                {this.props.statsIcon}
                <Typography 
                  variant="body2" 
                  style={{ 
                    marginLeft: '8px', 
                    color: '#666',
                    fontSize: '0.8rem'
                  }}
                >
                  {this.props.statsIconText}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="icon-container pulse-animation">
            <div style={{ color: 'white', fontSize: '2rem' }}>
              {this.props.bigIcon}
            </div>
          </Box>
        </Box>
        
        {this.props.clickable && (
          <Box marginTop={2}>
            {this.props.clickable}
          </Box>
        )}
      </Paper>
    );
  }
}

export default withTheme(StatsCard);
