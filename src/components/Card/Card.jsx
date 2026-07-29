import React, { Component } from "react";
import { Paper, Box, Typography, Divider, Chip, withTheme } from "@material-ui/core";

export class Card extends Component {
  render() {
    const { theme } = this.props;
    const isDark = theme.palette.type === 'dark';
    
    return (
      <Paper 
        elevation={3}
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, rgba(45, 55, 72, 0.95) 0%, rgba(45, 55, 72, 0.9) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '25px',
          border: isDark 
            ? '1px solid rgba(255,255,255,0.1)' 
            : '1px solid rgba(255,255,255,0.2)',
          height: '100%',
          transition: 'all 0.3s ease',
          color: theme.palette.text.primary
        }}
        className={this.props.plain ? "card-plain" : "modern-card"}
      >
        <style jsx>{`
          .modern-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.12) !important;
          }
          
          .chart-container {
            position: relative;
            height: 300px;
            margin: 20px 0;
          }
          
          .legend-modern {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
            margin-top: 15px;
          }
          
          .legend-modern > * {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 5px 10px;
            background: rgba(0,0,0,0.05);
            border-radius: 15px;
            font-size: 0.8rem;
          }
        `}</style>
        
        <Box className={this.props.hCenter ? "text-center" : ""}>
          <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={2}>
            <Box>
              <Typography 
                variant="h5" 
                style={{ 
                  fontWeight: 'bold', 
                  color: '#333',
                  marginBottom: '5px'
                }}
              >
                {this.props.title}
              </Typography>
              <Typography 
                variant="body2" 
                style={{ 
                  color: '#666',
                  fontSize: '0.9rem'
                }}
              >
                {this.props.category}
              </Typography>
            </Box>
            {this.props.statsIcon && (
              <Chip 
                icon={<i className={this.props.statsIcon} />}
                label="Live"
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
          </Box>
        </Box>
        
        <Box
          className={
            "chart-container" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.ctTableFullWidth ? " table-full-width" : "") +
            (this.props.ctTableResponsive ? " table-responsive" : "") +
            (this.props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
          {this.props.content}
        </Box>

        <Box>
          {this.props.legend && (
            <Box className="legend-modern">
              {this.props.legend}
            </Box>
          )}
          {this.props.stats && (
            <>
              <Divider style={{ margin: '15px 0' }} />
              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography 
                  variant="body2" 
                  style={{ 
                    color: '#666',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <i className={this.props.statsIcon} style={{ color: '#4CAF50' }} />
                  {this.props.stats}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    );
  }
}

export default withTheme(Card);
