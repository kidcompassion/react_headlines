import React from 'react';

class AddRss extends React.Component{

    handleSubmit=(e)=>{
        e.preventDefault();
        console.log('handle');

        //create new link
        //create 
    }
    render(){
        return(
            <div className="col-6 mx-auto">
            <h1>Add A Publication</h1>
            <form onSubmit={this.handleSubmit} >
                <div className="form-group">
                    <label htmlFor="pubName">Publication Name</label>
                    <input type="text" className="form-control" id="pubName" aria-describedby="PublicationName" />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="pubUrl">Publication Url</label>
                    <input type="text" className="form-control" id="pubUrl" aria-describedby="PublicationUrl" />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="rssUrl">Publication RSS Feed</label>
                    <input type="text" className="form-control" id="rssUrl" aria-describedby="PublicationRss" />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="logoUrl">Publication Logo Url</label>
                    <input type="text" className="form-control" id="logoUrl" aria-describedby="PublicationLogo" />
                    
                </div>
               
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>


        );
    }
}

export default AddRss;