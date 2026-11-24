export function mapAuthError(error) {
  const message = error?.message || ''

  if (message.includes('Invalid login credentials')) {
    return 'E-mail ou palavra-passe incorrectos.'
  }
  if (message.includes('Email not confirmed')) {
    return 'Confirme o seu e-mail antes de iniciar sessão.'
  }
  if (message.includes('User already registered')) {
    return 'Já existe uma conta registada com este e-mail.'
  }
  if (message.includes('Password should be at least')) {
    return 'A palavra-passe deve ter pelo menos 6 caracteres.'
  }
  if (message.includes('Unable to validate email address')) {
    return 'Introduza um endereço de e-mail válido.'
  }
  if (message.includes('Failed to fetch') || message.includes('NetworkError')) {
    return 'Sem ligação ao servidor. Verifique a sua internet e tente novamente.'
  }

  return 'Ocorreu um erro inesperado na autenticação. Tente novamente.'
}
