let participants = [
  // Array e estrutura de dados de objetos dos participantes
  {
    nome: "Hiury Santos",
    email: "hiury@email.com",
    dtInscricao: new Date(2024, 2, 25, 15, 24),
    dtCheckIn: new Date(2024, 2, 27, 8, 30)
  },

  {
    nome: "Felipe Dantas",
    email: "felipe@email.com",
    dtInscricao: new Date(2024, 2, 27, 15, 24),
    dtCheckIn: new Date(2024, 2, 29, 4, 2)
  },

  {
    nome: "Marcos NSS",
    email: "marcos@email.com",
    dtInscricao: new Date(2024, 2, 29, 12, 45),
    dtCheckIn: null
  }
]

const addParticipant = (event) => {
  // Previni que o event faça o padrão (No caso, enviar os dados do formulário)
  event.preventDefault()

  // Receberá os dados do formulário
  const formData = new FormData(event.target)

  // Estrutura de dados de obejtos que serão coletados e formatados através do formData
  const formParticipant = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dtInscricao: new Date(),
    dtCheckIn: null
  }

  // Verificar se o email já existe
  const emailExist = participants.find(
    (p) => p.email == formParticipant.email
  )

  // Alerta que o email já existe e retorna
  if (emailExist) {
    alert('Email já cadastrado')
    return
  }

  // Adciona e atualiza a lista de array dos participantes
  participants = [formParticipant, ...participants]
  upList(participants)

  // Limpar o formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""

}

const newParticipant = (part) => {
  // Usa o plugin dayjs para formatar as datas das inscrições e check-ins
  const dtInscricao = dayjs(Date.now()).to(part.dtInscricao)
  let dtCheckIn = dayjs(Date.now()).to(part.dtCheckIn)

  // Condicional para o botão de check-in
  if (part.dtCheckIn == null) {
    dtCheckIn = `
      <button 
        data-email="${part.email}" 
        onclick="toCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  // Retorna os valores dos objetos/participantes formatados do tbody
  return `
    <tr>
      <td>
        <strong>
          ${part.nome}
        </strong>
        <br>
        <small>
          ${part.email}
        </small>
      </td>
      <td>${dtInscricao}</td>
      <td>${dtCheckIn}</td>
    </tr>
  `
}

const toCheckIn = (event) => {
  // Confirmar o check-in
  const confirmCheckIn = 'Tem certeza que deseja fazer o check-in?'

  // Retorna se for falso
  if (confirm(confirmCheckIn) == false) {
    return
  }

  // Encotrar o particiopante da lista
  const noCheckInPart = participants.find(
    (p) => p.email == event.target.dataset.email
  )

  // Atualizar o check-in deste participante
  noCheckInPart.dtCheckIn = new Date()

  // Atualizar a lista de participantes
  upList(participants)
}

const upList = (participants) => {
  // Estrutura de repetição - loop
  out = ''
  for (let participant of participants) {
    out += newParticipant(participant)
  }

  // Substituir informação do HTML
  document.querySelector('tbody').innerHTML = out
}

upList(participants)