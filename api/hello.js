const meta = {
  name: 'hello',
  description: 'hello sample api endpoints',
  method: 'get',
  params: ['response'],
  category: 'example'
};

async function onStart({ req, res, log }) {
  try {
    const { response } = req.params;

    // If response param is provided, echo it back
    if (response) {
      log.main(`Received response param: ${response}`);
      return res.json({
        message: 'Hello from the sample API!',
        echoed: response,
        status: 'success'
      });
    }

    // Default response if no param (optional, depending on requirements)
    log.main('No response param provided');
    return res.json({
      message: 'Hello from the sample API! Provide a response parameter in the URL.',
      status: 'success'
    });

  } catch (error) {
    log.error('Error in hello API:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      status: 'error'
    });
  }
}

module.exports = { meta, onStart };