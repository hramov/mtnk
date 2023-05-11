import { compare, hash } from 'bcrypt';
import {ICryptoService} from "../../Core/ICore";

const SALT_ROUNDS = 10;

export class CryptoService implements ICryptoService {
	async generateHashedPassword(plain: string): Promise<string | Error> {
		return hash(plain, SALT_ROUNDS);
	}

	async checkPasswords(
		plain: string,
		hashed: string,
	): Promise<boolean | Error> {
		return compare(plain, hashed);
	}
}
