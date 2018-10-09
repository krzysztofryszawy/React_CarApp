import React, {Component} from 'react';
import classes from './Editor.css'

class Editor extends Component {
    

    
    render() {
        
        return(
                <div 
                   className={classes.Editor}
                   style={{
                        transform: this.props.show ? 'translateX(0)' : 'translateX(200vw)',
                    }}>
                    {this.props.children}
                </div>
        );
    }
}
    
    
    

    


export default Editor;