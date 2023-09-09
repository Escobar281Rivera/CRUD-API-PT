import { AppDataSource } from '../data-source'
import { Rol } from '../models/Rol'
import { User } from '../models/User'
import { Repository } from 'typeorm'

const rolRepository = AppDataSource.getRepository(Rol)
const userRepository = AppDataSource.getRepository(User)

export const assignNewRol = async (id: number) => {
    try {
        const newRolName = 'Usuario'
        const newRol = await rolRepository.findOne({ where: { rol: newRolName } })

        if (!newRol) {
            throw new Error('New role does not exist in the database')
        }
        const userRol = await userRepository.find({
            where: {
                rol: {
                    id: id,
                },
            },
        })
        const promises = userRol.map(async user => {
            user.rol = newRol
            await userRepository.save(user)
        })

        await Promise.all(promises)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const createSuperAdminRole = async (rolRepository: Repository<Rol>) => {
    let existingRol = await rolRepository.findOne({
        where: { rol: 'SuperAdministrador' },
    })

    if (!existingRol) {
        const superAdminRole = new Rol()
        superAdminRole.rol = 'SuperAdministrador'
        existingRol = await rolRepository.save(superAdminRole)
    }

    return existingRol
}