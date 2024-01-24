import initialData from "./initialData";
import {useState} from "react";
import {List,ListItem,Button,Card,CardActions,CardContent,Modal} from "@mui/material";
import { DragDropContext,Draggable,Droppable } from "react-beautiful-dnd";
import "./App.css"
import {NotificationContainer, NotificationManager} from 'react-notifications';
function App() {

  const [data,setData]=useState(initialData);
  const [isDragging, setIsDragging] = useState(false);
  const [color,setColor]=useState("white");
  const [open, setOpen] =useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDragEnd = (result) => {
    const {source,destination,type}=result;
    if(!destination) return;
    if(source.droppableId===destination.droppableId && source.index===destination.index) return;
    if(type==='group'){
      const reorderedData=[...data];
      const sourceIndex=source.index;
      const destinationIndex=destination.index;
      const [removedData]=reorderedData.splice(sourceIndex,1);
      reorderedData.splice(destinationIndex,0,removedData);
      setIsDragging(false);
      return setData(reorderedData);
    }

   
  };
  const handleDragStart = (result) => {
    console.log(result);
    
    setIsDragging(true);
  };

  const handleClick = () => {
    setTimeout(()=>{
      setOpen(false);
      console.log(data);
    },500);
    NotificationManager.info('Info message');
    
  }

  return (
    <>
   
    <div className='parent'>
    <Button className="preview-btn" variant="contained" onClick={handleOpen}>Preview</Button>
    </div>
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    sx={{overflowY:'auto'}}
  >
    <Card className='card'>
  <CardContent>
  
<DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable" type="group">
        {(provided,snapshot) => (
          <List ref={provided.innerRef} {...provided.droppableProps} className={`${snapshot.isDraggingOver? 'not-dragging' : 'dragging'}`}>
            {data.map((task, index) => (
              <Draggable key={task.oplay_id} draggableId={task.oplay_id} index={index}>
                {(provided,snapshot) => (
                  <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    
                    className={`item ${snapshot.isDragging? 'dragging' : 'not-dragging'}`}
                  >
                     <span className="material-symbols-outlined">
lists
</span>
                    <img className='poster-img' src={task.background_image}/>
                    <div className='info'>
                    <div className='title'>{task.title}</div>
                   
                       <div className='genres'>
                      {task.genre_mappings.map((genre, index) =>(
                        <p className='genre'> {genre}</p>
            
                      ))}
                       </div>
                       {/* <div>
                      {task.stores_mappings.map((store, index) =>(
                        <img className='store' src={store.store_image}/>
                       
                      ))}
                       </div> */}
                    </div>
                    
                  </ListItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
    </CardContent>
    <CardActions>
      <div className='save'>
    <Button variant="contained" onClick={handleClick}>Save</Button>
    </div>
    </CardActions>
    </Card>
    </Modal>

</>
  )
}

export default App;
