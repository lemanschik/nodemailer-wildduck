import nodeImap from 'node-imap';

export const imapStream = (inbox,fetchArgs) => {
  async start(controller) {
    const box = await nodeImap.openbox();
    box.fetch().on("")
  },
}
