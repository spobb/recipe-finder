import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, AfterLoad } from 'typeorm';
import { ROLE, STATUS } from '@user/enums'
import { Role, Status } from '@user/types';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
	constructor(data: any) {
		Object.assign(this, data);
	}

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({
		type: 'enum',
		enum: ROLE,
		default: ROLE.user
	})
	role: Role;

	@Column({
		type: 'enum',
		enum: STATUS,
	})
	status: Status;

	@Column({
		unique: true,
	})
	username: string;

	@Column({
		unique: true,
	})
	email: string;

	@Column()
	password: string;

	private currentPassword: string;

	@AfterLoad()
	afterLoad(): void {
		this.currentPassword = this.password;
	}

	@BeforeInsert()
	@BeforeUpdate()
	async encrypt(): Promise<string | boolean> {
		try {
			if (this.currentPassword === this.password) return true;
			this.password = await bcrypt.hash(this.password, 10);
			return true;
		} catch (err) {
			throw new Error(err);
		}
	}

	async comparePassword(password: string): Promise<boolean> {
		return await bcrypt.compare(password, this.password);
	}
}
