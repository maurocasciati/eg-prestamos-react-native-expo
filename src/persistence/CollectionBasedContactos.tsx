import Contacto from "../domain/Contacto"
import RepoContactos from "./RepoContactos"

export default class CollectionBasedContactos implements RepoContactos {
    contactos: Contacto[] = []
    ultimoId = 0

    tienePermiso(): boolean {
        return true
    }

    getContactos(): Contacto[] {
        return this.contactos
    }

    getContacto(contactoOrigen: Partial<Contacto>): Contacto | undefined {
        return this.contactos.find(contacto => 
            (contactoOrigen.numero && contacto.numero === contactoOrigen.numero) ||
            (contactoOrigen.email && contacto.email === contactoOrigen.email) ||
            (contactoOrigen.nombre && contacto.nombre === contactoOrigen.nombre)
        )
    }

    getContactoPorId(id: string): Contacto | undefined {
        return this.contactos.find(contacto => contacto.id === id)
    }

    addContacto(contacto: Contacto): void {
        contacto.id = String(this.ultimoId++)
        this.contactos.push(contacto)
    }

    addContactoSiNoExiste(_contacto: Contacto): void {
        const contacto = this.getContacto(_contacto)
        if (!contacto) {
            this.addContacto(_contacto)
        }
    }

    removeContacto(contactoARemover: Contacto): void {
        this.contactos = this.contactos.filter(contacto => contacto.id === contactoARemover.id)
    }

    updateContacto(_contacto: Contacto): void {
        const contacto = this.getContacto(_contacto)
        if (contacto) {
            this.removeContacto(contacto)
        }
        this.addContacto(_contacto)
    }

    eliminarContactos(): void {
        this.contactos.length = 0
    }

}