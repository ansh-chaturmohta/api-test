const express = require('express');

const app = express();

let sleepData = [];

app.use(express.json());

// POST /sleep - Create a new sleep record
app.post('/sleep', (req, res) => {
  const { userId, hours, timestamp } = req.body;
  if (!userId || !hours || !timestamp) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const newRecord = {
    id: Date.now(),
    userId,
    hours,
    timestamp,
  };
  sleepData.push(newRecord);
  res.status(201).json(newRecord);
});

// GET /sleep/:userId - Retrieve sleep records for a user
app.get('/sleep/:userId', (req, res) => {
  const userId = req.params.userId;
  var userRecords;
  var fg=0;
  for(var i=0;i<sleepData.length;i++){
    if(sleepData[i].userId==userId){
        userRecords=sleepData[i];
        fg=1;
        break;
    }
  }
  if(fg==1){
    res.json(userRecords);
  }
  else{
    res.status(400).json({message:"not found"});
  }
});

// DELETE /sleep/:recordId - Delete a sleep record
app.delete('/sleep/:recordId', (req, res) => {
  const recordId = parseInt(req.params.recordId);
  const recordIndex = sleepData.findIndex((record) => record.id === recordId);
  if (recordIndex === -1) {
    return res.status(404).json({ message: 'Record not found' });
  }
  sleepData.splice(recordIndex, 1);
  res.json({ message: 'Record deleted' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
