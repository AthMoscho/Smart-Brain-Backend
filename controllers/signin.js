const handleSignin = async (req,res,db,bcrypt) => {
	const {email, password } = req.body;

	if (!email || !password ) {
		return res.status(400).send({error: 'Invalid Input'})
	}
	try{	
		const data = await db.select('email', 'hash').from('login').where('email', '=', email)
		const isValid = await bcrypt.compareSync(password, data[0].hash)
		if(!isValid){
			return res.status(401).send({error: 'Wrong Credentials'})
		}
		
		const user = await db.select('*').from('users').where('email', '=', email)
		res.json(user[0]).send()
	} catch (e) {
		return res.status(401).send({error: 'Wrong Credentials'})
	}

}
 
module.exports = {
	handleSignin
};