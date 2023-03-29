const users=[];

function User(id,username,roomvalue){
    const user={id,username,roomvalue};
    users.push(user)
    console.log(users)
    return user
}

module.exports={User}