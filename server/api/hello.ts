defineRouteMeta({
  openAPI: {
    tags: ['home'],
    summary: 'Get home page information',
    description: 'Retrieves the main message and description for the home page.',
    responses: {
      200: {
        description: 'Home page information retrieved successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object' as const,
              properties: {
                message: { type: 'string' as const, description: 'Main message' },
                description: { type: 'string' as const, description: 'Page description' },
              },
            },
          },
        },
      },
    },
  }
});

export default defineEventHandler(() => {
  return {
    message: 'Soluciones tecnológicas ',
    description: 'Hemos construido una asociación sólida y duradera. Su confianza es nuestra fuerza impulsora, impulsándonos hacia el éxito compartido.'
  }
});