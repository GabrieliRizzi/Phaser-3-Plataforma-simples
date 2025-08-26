const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 800 }, debug: false }
  },
  scene: { preload, create, update }
};

const game = new Phaser.Game(config);
let player, cursors, platforms;

function preload() {}

function create() {
  platforms = this.physics.add.staticGroup();

  platforms.create(400, 588, null).setScale(2).refreshBody().setSize(800, 24);
  platforms.create(600, 450, null).setSize(120, 20).refreshBody();
  platforms.create(50, 350, null).setSize(120, 20).refreshBody();
  platforms.create(300, 250, null).setSize(120, 20).refreshBody();

  platforms.getChildren().forEach((p) => {
    this.add.rectangle(p.x, p.y, p.body.width, p.body.height, 0x8B4513);
  });

  const rect = this.add.rectangle(100, 450, 36, 48, 0x0066ff);
  player = this.physics.add.existing(rect);
  player.body.setCollideWorldBounds(true);
  player.body.setBounce(0.1);
  player.body.setSize(36, 48);

  this.physics.add.collider(player, platforms);
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  const speed = 200;
  if (cursors.left.isDown) player.body.setVelocityX(-speed);
  else if (cursors.right.isDown) player.body.setVelocityX(speed);
  else player.body.setVelocityX(0);

  if (cursors.up.isDown && player.body.blocked.down)
    player.body.setVelocityY(-420);
}
