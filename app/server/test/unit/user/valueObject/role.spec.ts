import { Roles } from '../../../../src/Core/User/Roles';
import { Role } from '../../../../src/Core/User/ValueObject/Role';
import { ParsedRole } from '../../../../src/Core/User/ValueObject/ParsedRole';

describe('role value object', () => {
	it('parse role', () => {
		const testCases = [
			{
				name: 'Mtnk Admin',
				input: '0',
				output: new ParsedRole(0, null, null)
			},
			{
				name: 'Block Admin',
				input: '101',
				output: new ParsedRole(1, 1, null)
			},
			{
				name: 'Dept Admin',
				input: '20101',
				output: new ParsedRole(2, 1, 1)
			},
			{
				name: 'Creator',
				input: '30102',
				output: new ParsedRole(3, 1, 2)
			},
			{
				name: 'Approver',
				input: '40102',
				output: new ParsedRole(4, 1, 2)
			},
			{
				name: 'Committee',
				input: '4',
				output: new ParsedRole(4, null, null)
			},
		];

		for (const tCase of testCases) {
			const role = new Role(tCase.input);
			const result = role.parse();
			expect(result).toStrictEqual(tCase.output);
		}
	})
})