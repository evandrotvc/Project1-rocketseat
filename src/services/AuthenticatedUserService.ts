import {compare} from 'bcryptjs'
import User from '../models/Users'
import {getRepository} from 'typeorm'
import {sign} from 'jsonwebtoken'


interface RequestDTO {
    email : string;
    password: string;
}
interface ResponseDTO{
    user: User;
    token : string;
}
class AuthenticatedUserService {
    public async execute({email , password} : RequestDTO) : Promise<ResponseDTO>{
    const UserRepositories = getRepository(User)

    const user = await UserRepositories.findOne({where : {email}})
    if(!user){
        throw new Error('Incorrect Email or password incorrect.');
    }
    const ComparePassword = await compare(password , user.password)
    if(!ComparePassword){
        throw new Error('Incorrect Email or password incorrect.');
    }

    // Criando jsonwebtoken
    const token = sign({} , '7c8c29d9f5b447c81834cf170dc2f0fe', {
        subject: user.id, // sempre o id do user
        expiresIn: '1d' // 1 dia de login tomará desconnect
    })

    return {user , token }
    }
}

export default AuthenticatedUserService;
