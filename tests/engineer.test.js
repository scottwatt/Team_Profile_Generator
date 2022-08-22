const Engineer = require('../lib/Engineer');

// creating engineer object  
test('creates an Engineer object', () => {
    const engineer = new Engineer('Test', 22, 'Test@gmail', 'Tes');
    
    expect(engineer.github) .toEqual(expect.any(String));
});

// gets github from getGithub()
test('gets engineer github value', () => {
    const engineer = new Engineer('Nicole', 22, 'nicole@gmail', 'nicole');

    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString()));
});

// gets role from getRole() 
test('gets role of employee', () => {
    const engineer = new Engineer('Test', 22, 'Testw@gmail', 'Test');

    expect(engineer.getRole()).toEqual("Engineer");
});