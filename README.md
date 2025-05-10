# Mother's Day Gift Website

A beautiful, interactive website created as a special Mother's Day gift. Features include:
- Interactive photo gallery with smooth transitions
- Timeline view of memories
- Mobile-optimized design
- Beautiful animations and effects

## Development

To run the project locally:

```bash
# Install dependencies
npm install

# Start development server
npm start
```

## Deployment

### Option 1: Using the deployment script

```bash
# Make the script executable (first time only)
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

### Option 2: Manual deployment

1. Build the project:
```bash
npm run build
```

2. Serve the build:
```bash
npx serve -s build
```

### Deploying to a hosting service

The `build` folder contains the production-ready files that can be deployed to any static hosting service like:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- AWS S3

## Project Structure

```
├── public/
│   ├── photos/     # Photo gallery images
│   └── index.html
├── src/
│   ├── components/ # React components
│   ├── App.tsx     # Main application
│   └── index.tsx   # Entry point
└── package.json
```

## Technologies Used

- React
- TypeScript
- Material-UI
- Framer Motion
- Styled Components

## License

MIT 