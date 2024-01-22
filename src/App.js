import initialData from "./initialData";
import {useState} from "react";
import {List,ListItem,Button,Card,CardActions,CardContent} from "@mui/material";
import { DragDropContext,Draggable,Droppable } from "react-beautiful-dnd";

function App() {

  const [data,setData]=useState(initialData);
  const [preview,setPreview]=useState(false);
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
      
      return setData(reorderedData);
    }
  };
  return (
  <Card sx={{ maxWidth: 275}}>
     <CardActions>
    <Button variant="contained" onClick={()=>setPreview(true)}>Contained</Button>
    </CardActions>
  <CardContent>
  {preview &&
<DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable" type="group">
        {(provided) => (
          <List ref={provided.innerRef} {...provided.droppableProps}>
            {data.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                  </ListItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>}
    </CardContent>
    </Card>
   
  )
}

export default App;
