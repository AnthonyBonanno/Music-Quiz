export default function Nav({ links }) {
    return (
      <nav>
            <ul>
              {links.map((link) => link)}
            </ul>
      </nav>
    );
  }
  