import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      email,
      password
    }
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      if (result) {
        localStorage.setItem('user', JSON.stringify(result))
        navigate('/protected')
      } else {
        alert('User not found')
      }
      setEmail('')
      setPassword('')
    } catch (error) {
      alert(error)
    }
  };

  return (
    <main>
      <h1>Login</h1>
      <form action='POST' onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => { setEmail(e.target.value) }}
            value={email}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => { setPassword(e.target.value) }}
            value={password}
          />
        </div>
        <button type="submit" className="secondary">Login</button>
      </form>
    </main>
  )
}
