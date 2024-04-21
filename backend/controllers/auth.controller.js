import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const signup = async (req, res) => {
    try{
        const {fullName, userName, password, confirmPassword, gender}= req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error: "Password do not match"})
        }   
 
        const user = await User.findOne({userName});    // If we find current username in the database, then user will not be empty
                                                        // and we will return a message that username already exists
        // console.log("User", user);
        if(user){
            return res.status(400).json({error: "User name already exists"});
        }

        // HASH PASSWORD HERE
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);



        // PROFILE PICTURE CONTENT HERE
        // https://avatar-placeholder.iran.liara.run/
        
        // default profile pictures
        const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        // Create new user object
        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePicture: gender === "male" ? boyProfilePicture : girlProfilePicture,
        });

        if(newUser){
            await generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
    
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePicture: newUser.profilePicture,
    
            });
        }

        else{
            res.status(400).json({error: "Invalid user data"});
        }
        
    }
    catch(error){
        console.log("Error on signup controller", error.message);
        res.send(500).json({error: "Internal server error"});
    }
}


export const login = async(req, res) => {
    try{
        const {userName, password} = req.body;
        const existingUser = await User.findOne({userName});
        
        
        // user exists in database, check his password
        if(existingUser){
            const isPasswordCorrect = await bcryptjs.compare(password, existingUser.password);
            if(isPasswordCorrect){
                // password matches
                await generateTokenAndSetCookie(existingUser._id, res);
                res.status(200).json({
                    _id: existingUser._id,
                    fullName: existingUser.fullName,
                    userName: existingUser.userName,
                    profilePicture: existingUser.profilePicture,
                });
            }

            else{
                // password does not match
                return res.status(400).json({error: "Invalid password credentials"});
            }
        }  
        else{
            return res.status(400).json({error: "Invalid user name credentials"});
        }
    }

    catch(error){
        console.log("Error on login controller", error.message);
        res.send(500).json({error: "Internal server error"});
    }
}


export const logout = async(req, res) => {
    try{
        res.cookie("jwt", "", {maxAge: 0}); // CHange jwt field value to blank and maxAge to 0, to delte the cookie timeperiod
        res.status(200).json({message: "logged out successfully"});
    }

    catch(error){
        console.log("Error on logout controller", error.message);
        res.send(500).json({error: "Internal server error"});
    }
}