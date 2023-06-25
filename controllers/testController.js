
const testController = (req,res)=>{
    res.status(200).json({
        message : 'test route running',
        succses:true
    })
}

module.exports = {testController};