interface props {
  latitude: string
  longitude: string
}

const apiKey = process.env.NEXT_PUBLIC_apiKey;

// Função para buscar os dados do usuário
export async function fetchwhetherToday(latitude: string, longitude: string) {

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
  const data = await response.json();
  
  return data;
}

// Função para buscar os dados do post
export async function fetchwhetherWeek({ latitude, longitude }: props) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
  const data = await response.json();
  return data;
}