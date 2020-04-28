import User from '../models/Users'
import {getRepository} from 'typeorm'
import { hash} from 'bcryptjs'

interface RequestDTO {
    name: string;
    email:string;
    password:string;
}

class CreateUserService {
    public async  execute({name , email,password} : RequestDTO) : Promise<User>{
        const UserRepository = getRepository(User)

        const checkUserExist = await UserRepository.findOne({
            where: {email},
        })
        if(checkUserExist){
            throw new Error('Email address already used');
        }
        const hashedPassword = await hash(password ,8 )
        const user = UserRepository.create({
            email,
            name,
            password : hashedPassword
        })

        await UserRepository.save(user)
        return user
    }
}

export default CreateUserService
