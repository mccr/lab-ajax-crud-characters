const charactersAPI = new APIHandler("http://ih-api.herokuapp.com");

$(document).ready( () => {

  const addChar = (char) => {
    const $charContain = $(".characters-container");
    const name = $(`<div><p>Character Name: ${char.name}</p></div>`).addClass('name');
    const occupation = $(`<div><p>Character Occupation: ${char.occupation}</p></div>`).addClass('occupation');
    const debt = $(`<div><p>Character Debt: ${char.debt}</p></div>`).addClass('debt');
    const weapon = $(`<div><p>Character Weapon: ${char.weapon}</p></div>`).addClass('weapon');
    const charDone = $('<div>').addClass('character-info').append(name).append(occupation).append(debt).append(weapon);
    $charContain.append(charDone);
  };

  $('#fetch-all').on('click', (e) => {
    charactersAPI.getFullList().then( charactersList => {
      charactersList.forEach( char => char ? addChar(char) : console.log("Error"));
    });
  });

  $('#fetch-one').on('click', (e) => {
    const charId = $('#character-id').val();
    charactersAPI.getOneRegister(charId).then( character => {
      addChar(character);
    });
  });

  $('#delete-one').on('click', (e) => {
    const charId = $('#character-id-delete').val();
    charactersAPI.deleteOneRegister(charId).then( result => console.log(result));
  });

  $('#edit-character-form').on('submit', (e) => {
    e.preventDefault();
    const charId = $('#chr-id').val();
    const character = {
      name: $('#nameEdit').val(),
      occupation: $('#occupationEdit').val(),
      weapon: $('#weaponEdit').val(),
      debt: $('#debtEdit').val()
    };
    charactersAPI.updateOneRegister(charId, character);
  });

  $('#new-character-form').on('submit', (e) => {
    e.preventDefault();
    const character = {
      name: $('#name').val(),
      occupation: $('#occupation').val(),
      weapon: $('#weapon').val(),
      debt: $('#debt').val()
    };
    charactersAPI.createOneRegister(character);
  });
});
